export interface WizardState<T = unknown> {
  data?: T;
  next(context: WizardStore): void;
  prev(context: WizardStore): void;
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
    this.context.setCurrentData(this._data); // auto-save
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
    this.context.currentState = this.context.preferencesState;
  }

  prev() {
    console.log('[UserInfoState.prev] Already first step');
  }

  display() {
    return 'User Info Step';
  }
}


export class PreferencesState extends BaseWizardState<{ theme: string; notifications: boolean }> {
  constructor(context: WizardStore) {
    super(context, { theme: 'light', notifications: true });
  }

  next() {
    this.context.currentState = this.context.reviewState;
  }

  prev() {
    this.context.currentState = this.context.userInfoState;
  }

  display() {
    return 'Preferences Step';
  }
}


export class ReviewState extends BaseWizardState<null> {
  constructor(context: WizardStore) {
    super(context, null);
  }

  next() {
    console.log('[ReviewState.next] Wizard complete!');
  }

  prev() {
    this.context.currentState = this.context.preferencesState;
  }

  display() {
    return 'Review Step';
  }
}

export class WizardStore {
  userInfoState = new UserInfoState(this);
  preferencesState = new PreferencesState(this);
  reviewState = new ReviewState(this);

  currentState = $state<WizardState>(this.userInfoState);

  next() {
    this.currentState.next(this);
  }

  prev() {
    this.currentState.prev(this);
  }

  display() {
    return this.currentState.display();
  }

  getCurrentData<T>() {
    console.log('[WizardStore.getCurrentData]', this.currentState.display(), this.currentState.data);
    return this.currentState.data as T | undefined;
  }

  setCurrentData<T>(data: T) {
    console.log('[WizardStore.setCurrentData]', this.currentState.display(), data);
    this.currentState.data = { ...data } as T;
  }
}

export const wizard = new WizardStore();
