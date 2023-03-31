// native components
import { useEffect, useState } from 'react';
import { Box, Button, Input, Text, TextArea, Select } from 'native-base';
import { TextInput } from 'react-native';
// styles
import { COLORS } from './../../config/colors';
// custom components
import { CreateChamado, UpdateChamado } from '../../services/ChamadoService';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { ConvertDate_ToISOFormat, CovnertDate_Minus3, CovnertDate_Plus3, GetAlertMessageValidacao } from '../../helpers/Util';
import { Pressable } from 'native-base';
import { ConvertDate_ToPTBRFormat } from './../../helpers/Util';


const ChamadoFormScreen = ({ navigation, route }) => {
  const [chamado, setChamado] = useState({
    id: "",
    analista: "",
    descricao: "",
    empresa: "",
    data: "",
    assunto: "",
    status: ""
  });

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    let newDt = CovnertDate_Minus3(currentDate);

    setChamado({ ...chamado, data: ConvertDate_ToISOFormat(newDt) });
  };

  const showMode = (currentMode) => {
    const dt = chamado.data ? CovnertDate_Plus3(chamado.data) : new Date();
    DateTimePickerAndroid.open({
      value: dt,
      onChange,
      mode: currentMode
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const handleChange = (field, value) => {
    setChamado({ ...chamado, [field]: value });
  }

  const handlePress = async () => {

    if (!ValidaChamado(chamado)) return;

    if (chamado.id) {
      await UpdateChamado(chamado);
    }
    else {
      await CreateChamado(chamado);
    }

    // back to chamados list
    navigation.goBack();
  }

  const ValidaChamado = (chamado) => {
    // data
    if (!chamado.data || chamado.data.length === 0) {
      GetAlertMessageValidacao("Data", "Selecione a data do chamado");
      return false;
    }
    if (!chamado.assunto || chamado.assunto.length === 0) {
      GetAlertMessageValidacao("Assunto", "Selecione o assunto do chamado");
      return false;
    }
    if (!chamado.analista || chamado.analista.length === 0) {
      GetAlertMessageValidacao("Analista", "Selecione o analista do chamado");
      return false;
    }
    if (!chamado.descricao || chamado.descricao.length === 0) {
      GetAlertMessageValidacao("Descrição", "Informe a descrição do chamado");
      return false;
    }
    if (!chamado.empresa) {
      GetAlertMessageValidacao("Empresa", "Selecione a empresa do chamado");
      return false;
    }
    if (!chamado.status) {
      GetAlertMessageValidacao("Status", "Selecione o status do chamado");
      return false;
    }

    return true;
  }

  useEffect(() => {
    const { chamado } = route.params;
    setChamado(chamado);

    navigation.setOptions({
      headerTitle: chamado.id ? "Editar Chamado" : "Novo Chamado",
      headerTitleStyle: {
        color: COLORS.orange[300],
      }
    })
  }, [])

  return (
    <Box flex={1} padding={2}>
      <Box>
        <Box marginBottom={2}>
          <Pressable onPress={showDatepicker}>
            {chamado.data ?
              <Text borderWidth={1} borderColor={'#ddd'} padding={3} color={COLORS.bluegrey[600]} fontSize={20}>
                {ConvertDate_ToPTBRFormat(chamado.data)}
              </Text>
              :
              <Text borderWidth={1} borderColor={'#ddd'} padding={3} color={'#999'} fontSize={20}>
                Data
              </Text>
            }
          </Pressable>
        </Box>
        <Box marginBottom={2}>
          <Input variant={'outline'} color={COLORS.bluegrey[800]} placeholder={"Assunto"} fontSize={20} value={chamado.assunto} onChangeText={e => handleChange("assunto", e)} />
        </Box>
        <Box marginBottom={2}>
          <Select selectedValue={chamado.analista} color={COLORS.bluegrey[800]} fontSize={20} placeholder={'Selecione o Analista'} onValueChange={item => setChamado({ ...chamado, analista: item })}>
            <Select.Item label="Gerio" value="Gerio" />
            <Select.Item label="Moiza" value="Moiza" />
            <Select.Item label="Paty" value="Paty" />
          </Select>
        </Box>
        <Box marginBottom={2}>
          <TextArea variant={'outline'} color={COLORS.bluegrey[800]} multiline={true} h={130} placeholder={"Descricao"} fontSize={20} value={chamado.descricao} onChangeText={e => handleChange("descricao", e)} />
        </Box>
        <Box marginBottom={2}>
          <Select selectedValue={chamado.empresa} color={COLORS.bluegrey[800]} fontSize={20} placeholder={'Selecione a Empresa'} onValueChange={item => setChamado({ ...chamado, empresa: item })}>
            <Select.Item label="Focus" value="Focus" />
            <Select.Item label="Fei" value="Fei" />
            <Select.Item label="Cetek" value="Cetek" />
            <Select.Item label="WR Software" value="WR Software" />
            <Select.Item label="MB Software" value="MB Software" />
          </Select>
        </Box>
        <Box marginBottom={2}>
          <Select selectedValue={chamado.status} color={COLORS.bluegrey[800]} fontSize={20} placeholder={'Selecione o status'} onValueChange={item => setChamado({ ...chamado, status: item })}>
            <Select.Item label="Novo" value="Novo" />
            <Select.Item label="Andamento" value="Andamento" />
            <Select.Item label="Finalizado" value="Finalizado" />
          </Select>
        </Box>
      </Box>
      <Box>
        <Button backgroundColor={COLORS.orange[400]} size={'lg'} onPress={handlePress}>Salvar</Button>
      </Box>
    </Box >
  )
}
export default ChamadoFormScreen;