export const AUTH_SESSION_KEY = "boa-demo-authenticated";

export type LoginCredential = {
  userId: string;
  password: string;
};

export const loginCredentials: LoginCredential[] = [
  {
    userId: "7000589",
    password: "Duque1994",
  },
];

export function isValidLogin(userId: string, password: string) {
  return loginCredentials.some(
    (credential) => credential.userId === userId.trim() && credential.password === password,
  );
}
