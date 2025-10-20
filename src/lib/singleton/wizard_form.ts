interface Step<T = unknown> {
	title: string;
	component: unknown;
	data?: T;
	validate?: (data: T) => boolean;
}

// Wizard interface
export interface IWizard<T = unknown> {
    steps: Step<T>[];       // reactive array of steps
    currentIndex: number;   // reactive current index

    currentStep: Step<T> | null;
    next(): void;
    prev(): void;
    goTo(index: number): void;
    setStepData(data: T): void;
    reset(): void;
    getStepCount(): number;
}

// Implementation
export class WizardStore<T = unknown> implements IWizard<T> {
    steps = $state<Step<T>[]>([]);
    currentIndex = $state(0);

    constructor(initialSteps: Step<T>[] = []) {
        if (initialSteps.length) this.steps = initialSteps;
    }

    get currentStep(): Step<T> | null {
        return this.steps[this.currentIndex] ?? null;
    }

    next() {
        const step = this.currentStep;
        if (!step) return;
        if (step.validate && step.data !== undefined && !step.validate(step.data)) return;
        if (this.currentIndex < this.steps.length - 1) {
            this.currentIndex++;
        }
    }

    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        }
    }

    goTo(index: number) {
        if (index >= 0 && index < this.steps.length) {
            this.currentIndex = index;
        }
    }

    setStepData(data: T) {
        const step = this.currentStep;
        if (step) step.data = data;
    }

    reset() {
        this.currentIndex = 0;
        this.steps.forEach(step => step.data = undefined);
    }

    getStepCount() {
        return this.steps.length;
    }
}

// Example singleton
export const wizard = new WizardStore([
    { title: 'User Info', component: null, data: { name: '', email: '' }, validate: d => !!d.name && !!d.email },
    { title: 'Preferences', component: null, data: { newsletter: false } },
    { title: 'Review', component: null }
]);