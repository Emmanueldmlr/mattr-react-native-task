export const calculateAgeFromDOB = (dob: string) => {
    const dobParts = dob.split("/");

    //convert date parts to integers
    const birthDate = new Date(
      parseInt(dobParts[2]),
      parseInt(dobParts[1]) - 1,
      parseInt(dobParts[0])
    );

    const currentDate = new Date();
    let calculatedAge = currentDate.getFullYear() - birthDate.getFullYear();

    // Check if the current date is before the birth date in the current year
    const monthDifference = currentDate.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())
    ) {
      calculatedAge--;
    }

    return calculatedAge;
}