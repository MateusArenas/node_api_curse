import crypto from 'node:crypto';

export interface EntityProps extends Record<string, any> {}

export abstract class Entity<Props extends EntityProps> {
  private _props: Props = {} as Props;
  private _changes: Partial<Props> = {};

  static randomUUID(): string {
    return crypto.randomUUID();
  }

  constructor(props: Props) {
    this.update(props);
    this.save();
  }

  BeforeSaveHook() {}
  AfterSaveHook() {}

  getProps(): Props {
    return this._props;
  }

  getChanges(): Partial<Props> {
    return this._changes;
  }

  private _applyChanges<T extends keyof Props>(): void {
    for (const field in this._changes) {
      if (typeof this._changes[field] !== 'undefined') {
        this._props[field as unknown as T] = this._changes[field] as Props[T];
      }
    }
  }

  setChange<T extends keyof Props>(field: T, value: Props[T]): this {
    if (typeof value !== 'undefined') {
      this._changes[field as T] = value;
    }
    return this;
  }

  get<T extends keyof Props>(field: T): Required<Props>[T] {
    return this._changes[field] || this._props[field];
  }

  set<T extends keyof Props>(this: any, field: T, value: Props[T]): this {
    this[field] = value;
    return this;
  }

  update(props: Partial<Props>): this {
    for (const [field, value] of Object.entries(props)) {
      this.set(field, value);
    }
    return this;
  }

  save(): this {
    if (Object.values(this._changes).length) {
      this.BeforeSaveHook();
      this._applyChanges();
      this._changes = {};
      this.AfterSaveHook();
    }
    return this;
  }

  toJSON(): Required<Props> {
    return this.getProps() as Required<Props>;
  }
}
