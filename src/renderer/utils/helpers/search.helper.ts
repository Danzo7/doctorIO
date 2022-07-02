import { patients } from '@api/fake';

export const searchPatient = (watchSearch: string) => {
  if (watchSearch && watchSearch.length > 0 && watchSearch.trim().length > 0) {
    return patients.find(
      (pat) =>
        pat.patId.toString() == watchSearch ||
        pat.firstName.toLowerCase() == watchSearch.toLowerCase() ||
        pat.lastName.toLowerCase() == watchSearch.toLowerCase(),
    );
  }
};
