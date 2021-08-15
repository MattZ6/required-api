export interface ICheckIfUserExistsByEmail {
  checkIfExistsByEmail(email: string): Promise<boolean>;
}
