const useSearchPatient = (
  input: string,
  usersData: any[],
  realTime?: boolean,
) => {
  let matches: any[] = [];
  if (input && input.length > 0 && input.trim().length > 0) {
    matches = usersData?.filter((user) => {
      if (!realTime)
        return (
          user.fullName.toLowerCase() == input.toLowerCase() ||
          user.id.toLowerCase() == input.toLowerCase()
        );
      else {
        const regex = new RegExp(`${input}`, 'gi');
        return user.fullName.match(regex);
      }
    });
    return matches;
  }
};

export default useSearchPatient;
