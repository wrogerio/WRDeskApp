// styles
import { COLORS } from '../../config/colors';
// native components
import { useEffect } from 'react';
import { Box, HStack, Pressable, Text } from 'native-base';
// helpers
import { ConvertDate_ToPTBRFormat } from './../../helpers/Util';
import { Alert } from 'react-native';
import { DeleteChamado } from '../../services/ChamadoService';

const ChamadoItem = ({ chamado, navigation }) => {

  const handleAssuntoPress = () => {
    navigation.navigate('ChamadoFormScreen', { chamado: chamado });
  }

  const handleDeleteChamado = async () => {

    Alert.alert(
      "Excluir Chamado",
      "Tem certeza que deseja excluir este chamado?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK", onPress: async () => {
            await DeleteChamado(chamado)
          }
        }
      ],
      { cancelable: false }
    );
  }

  return (
    <Box backgroundColor={COLORS.bluegrey[50]} padding={2} marginBottom={4} borderColor={COLORS.bluegrey[700]} borderWidth={1} borderRadius={4} >
      <Pressable onLongPress={handleDeleteChamado}>
        <HStack justifyContent={'space-between'} backgroundColor={COLORS.orange[50]} borderColor={COLORS.orange[200]} borderWidth={1} paddingX={4} paddingY={1} shadow={2}>
          <Pressable onPress={handleAssuntoPress}>
            <Text fontSize={20} color={COLORS.bluegrey[700]}>{chamado.assunto}</Text>
          </Pressable>
          <Text fontSize={20} color={COLORS.bluegrey[700]}>{chamado.analista}</Text>
        </HStack>
        <Box marginY={2}>
          <Text fontSize={20} textAlign='justify'>{chamado.descricao}</Text>
        </Box>
        <HStack justifyContent={'space-between'} backgroundColor={COLORS.bluegrey[50]} paddingX={4} paddingY={1} shadow={2}>
          <Text fontSize={20} color={COLORS.bluegrey[700]}>{chamado.empresa}</Text>
          <Text fontSize={20} color={COLORS.bluegrey[700]}>{ConvertDate_ToPTBRFormat(chamado.data)}</Text>
        </HStack>
      </Pressable>
    </Box>
  )
}
export default ChamadoItem;