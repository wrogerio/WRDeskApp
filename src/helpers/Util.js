import { Alert } from 'react-native';

// convert date to format dd/mm/yyyy
export const ConvertDate_ToPTBRFormat = (date) => {
  const dateObj = new Date(date);
  const month = dateObj.getUTCMonth() + 1;
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
}

// convert date to format yyyy-mm-dd
export const ConvertDate_ToISOFormat = (date) => {
  const dateObj = new Date(date);
  const month = dateObj.getUTCMonth() + 1;
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
}

// convert date to brazilian fuso horario
export const CovnertDate_Minus3 = (date) => {
  const dateObj = new Date(date);
  // remove 3 hours from UTC
  dateObj.setHours(dateObj.getHours() - 3);
  // return in format yyyy-mm-dd
  return dateObj
}
export const CovnertDate_Plus3 = (date) => {
  const dateObj = new Date(date);
  // remove 3 hours from UTC
  dateObj.setHours(dateObj.getHours() + 3);
  // return in format yyyy-mm-dd
  return dateObj
}

export const GetAlertMessageValidacao = (titulo, mensagem) => {
  return Alert.alert(
    titulo,
    mensagem,
    [
      {
        text: "Ok",
        onPress: () => { },
        style: "cancel"
      },
    ],
    { cancelable: false }
  );
}

