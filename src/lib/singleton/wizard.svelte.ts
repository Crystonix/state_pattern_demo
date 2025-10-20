export interface WizardState<T = unknown> {
  data?: T;
  next(): void;
  prev(): void;
  display(): string;
}

export abstract class BaseWizardState<T> implements WizardState<T> {
  private _data: T;

  constructor(protected context: WizardStore, initialData: T) {
    this._data = initialData;
  }

  get data(): T {
    return this._data;
  }

  set data(value: T) {
    this._data = value;
    this.context.currentData = this._data; // auto-save via setter
    console.log(`[${this.constructor.name}] Data updated`, this._data);
  }

  abstract next(): void;
  abstract prev(): void;
  abstract display(): string;
}


export class UserInfoState extends BaseWizardState<{ name: string; email: string }> {
  constructor(context: WizardStore) {
    super(context, { name: '', email: '' });
  }

  next() {
    // Simple validation
    if (!this.data.name.trim() || !this.data.email.trim()) {
      console.warn('Please fill in both name and email before proceeding.');
      return; // prevent moving to next state
    }

    // Optional: simple email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.data.email)) {
      console.warn('Please enter a valid email address.');
      return;
    }

    // If validation passes, move to next state
    this.context.next();
  }

  prev() {
    this.context.prev();
  }

  display() {
    return 'User Info Step';
  }
}



export class PreferencesState extends BaseWizardState<{ theme: string; notifications: boolean; newsletter: boolean }> {
  constructor(context: WizardStore) {
    super(context, { theme: 'light', notifications: true, newsletter: false });
  }

  next() {
    // Example: only go to NewsletterStep if newsletter is true
    if (this.data.newsletter) {
      // Insert a hypothetical NewsletterState dynamically
      const newsletterStepIndex = this.context.steps.findIndex(
        step => step instanceof NewsletterState
      );
      if (newsletterStepIndex === -1) {
        // Dynamically add the step if it doesn’t exist
        this.context.steps.splice(this.context.currentIndex + 1, 0, new NewsletterState(this.context));
      }
    } else {
      // If newsletter not selected, skip the newsletter step if it exists
      const newsletterStepIndex = this.context.steps.findIndex(
        step => step instanceof NewsletterState
      );
      if (newsletterStepIndex > -1) {
        this.context.steps.splice(newsletterStepIndex, 1);
      }
    }

    // Move to the next step
    this.context.next();
  }

  prev() {
    this.context.prev();
  }

  display() {
    return 'Preferences Step';
  }
}

export class NewsletterState extends BaseWizardState<{ frequency: string }> {
  constructor(context: WizardStore) {
    super(context, { frequency: 'weekly' }); // default frequency
  }

  next() {
    // Move to the next step (ReviewState)
    this.context.next();
  }

  prev() {
    this.context.prev();
  }

  display() {
    return 'Newsletter Preferences';
  }
}




export class ReviewState extends BaseWizardState<null> {
  constructor(context: WizardStore) {
    super(context, null);
  }

  next() {this.context.next()}
  prev() {this.context.prev()}
  display() {return 'Review Step'}
}

class WizardStore {
  steps = $state<WizardState[]>([]);
	currentIndex = $state(0);

	constructor(stepClasses: (new (context: WizardStore) => WizardState) []) {
		this.steps = stepClasses.map(StepClass => new StepClass(this));
	}
  get currentState() {
		return this.steps[this.currentIndex]
	}

  set currentState(state: WizardState) {
    const index = this.steps.indexOf(state);
    if (index !== -1) this.currentIndex = index;
    else console.warn('[WizardStore] Tried to set unknown state');
  }

  set currentData(data: unknown) {
    this.steps[this.currentIndex].data = data;
  }

	next() {
    if (this.currentIndex < this.steps.length - 1) this.currentIndex += 1;
  }

  prev() {
    if (this.currentIndex > 0) this.currentIndex -= 1;
  }

  get isFirstStep() {
    return this.currentIndex === 0;
  }

  get isLastStep() {
    return this.currentIndex === this.steps.length - 1;
  }

	getAllData() {
		return this.steps.reduce((acc, step) => {
			if (step.data && typeof step.data === 'object') {
				return { ...acc, ...step.data };
			}
			return acc;
		}, {} as Record<string, unknown>);
	}
}

export const wizard = new WizardStore([
		UserInfoState,
		PreferencesState,
		ReviewState,
]);
