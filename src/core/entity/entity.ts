import crypto from 'node:crypto';

import { InvalidInput } from '../exceptions/InvalidInput';

export interface EntityProps extends Record<string, any> {}

export abstract class Entity<Props extends EntityProps> {
  protected _id: string;
  protected props: Props;
  protected _changes: Partial<Props> = {};

  constructor(props: Props, id: string = crypto.randomUUID()) {
    this._id = id;
    this.props = new Proxy({} as Props, {
      set: (target, prop, value) => {
        this._changes[prop as keyof Props] = value;
        target[prop as keyof Props] = value;
        return true;
      },
    });
    this.set(props).clearChanges();
  }

  set(props: Partial<Props>): this {
    for (const [prop, value] of Object.entries(props)) {
      if (value !== undefined) this[prop as keyof this] = value;
    }
    return this;
  }

  getProps(): Props {
    return this.props;
  }

  getChanges(): Partial<Props> {
    return this._changes;
  }

  clearChanges(): this {
    this._changes = {};
    return this;
  }

  toJSON(): { id: string } & Props {
    return Object.assign({ id: this._id }, this.props);
  }
}
