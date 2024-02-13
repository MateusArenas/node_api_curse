export class ListUsersDto {
  search?: string;
  skip: number = 0;
  take: number = 100;
}
