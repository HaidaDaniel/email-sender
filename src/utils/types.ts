export interface User {
  id: number;
  username: string;
  email: string;
}

export interface LoginUser {
  username: string;
  password: string;
}

export interface CreateUser {
  username: string;
  email: string;
  password: string;
}

export interface RetrieveUser extends User {}

export interface EmailLog {
  id: number;
  sender: number;
  recipient: string;
  subject: string;
  message: string;
}


export interface SendEmailForm {
  recipient: string;
  subject: string;
  message: string;
}

export interface SendEmail extends SendEmailForm {
  sender: number;
}

export interface EmailLogResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: EmailLog[];
}
