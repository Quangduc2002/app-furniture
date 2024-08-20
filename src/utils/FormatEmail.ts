export const FormatEmail = (email: string):string =>{
  const parts= email.split('@');
  const hiddenLocalPart =
    parts[0]?.substring(0, 2) + '*'.repeat(parts[0]?.length - (parts[0]?.length ? 2 : 0)) + parts[1];

    return  hiddenLocalPart
}
