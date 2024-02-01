// Maybe should create a special contract for new users.
export interface User {
  id: number | null;
  email: string;
  image?: string | null;
  firstName: string;
  lastName: string;
}
