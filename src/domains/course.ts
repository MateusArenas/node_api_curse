import crypto from 'node:crypto';

import { Entity } from '../core/entity/entity';

interface CourseProps {
  title: string;
  purchasesProductId: string;
}

export class Course extends Entity<CourseProps> {
  constructor(props: CourseProps, _id: string = crypto.randomUUID()) {
    super(props, _id);
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this.props.title;
  }

  set title(value: string) {
    this.props.title = value;
  }

  get purchasesProductId(): string {
    return this.props.purchasesProductId;
  }

  set purchasesProductId(value: string) {
    this.props.purchasesProductId = value;
  }
}

const course = new Course({
  title: 'abc',
  purchasesProductId: 'kjh12bh1',
});

console.log({ props: course.getProps(), changes: course.getChanges() });

course.title = 'rf';

console.log({ props: course.getProps(), changes: course.getChanges() });

course.clearChanges();

console.log({ props: course.getProps(), changes: course.getChanges() });

course.set({ title: 'yuyu', purchasesProductId: 'asd' });

console.log({ props: course.getProps(), changes: course.getChanges() });

console.log({ json: course.toJSON() });
