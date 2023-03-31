// styles
import { COLORS } from '../../config/colors';
// native components
import { useState, useEffect } from 'react';
import { Box, HStack, Text } from 'native-base';
import { Pressable } from 'native-base';

const ChamadosHeader = ({ chamados, toogleStatus, status }) => {
  const [qtdCetek, setQtdCetek] = useState(0);
  const [qtdFocus, setQtdFocus] = useState(0);
  const [qtdWR, setQtdWR] = useState(0);
  const [qtdFEI, setQtdFEI] = useState(0);

  const handleChangeChamadosView = () => {
    toogleStatus();
  }

  useEffect(e => {
    setQtdCetek(chamados.filter(e => e.empresa === 'Cetek').length);
    setQtdFocus(chamados.filter(e => e.empresa === 'Focus').length);
    setQtdFEI(chamados.filter(e => e.empresa === 'FEI').length);
    setQtdWR(chamados.filter(e => e.empresa === 'WR Software' || e.empresa === "MB Software").length);
  }, [chamados])
  return (
    <Box marginBottom={2}>
      <Pressable onLongPress={handleChangeChamadosView}>
        <HStack space={1} justifyContent={'space-between'}>
          <Text fontSize={24} color={COLORS.orange[300]} fontWeight={'bold'}>Resumo</Text>
          <Text fontSize={24} color={COLORS.orange[300]} fontWeight={'bold'}>{status}</Text>
        </HStack>
      </Pressable>
      <HStack space={1}>
        <Box flex={1} alignItems={'center'} backgroundColor={COLORS.orange[50]} padding={2} borderRadius={4} borderWidth={1} borderColor={COLORS.orange[400]}>
          <Text color={COLORS.blue[700]} fontSize={18} fontWeight={700}>FEI</Text>
          <Text color={COLORS.blue[700]} fontSize={24} fontWeight={700}>{qtdFEI}</Text>
        </Box>
        <Box flex={1} alignItems={'center'} backgroundColor={COLORS.orange[50]} padding={2} borderRadius={4} borderWidth={1} borderColor={COLORS.orange[400]}>
          <Text color={COLORS.blue[700]} fontSize={18} fontWeight={700}>Cetek</Text>
          <Text color={COLORS.blue[700]} fontSize={24} fontWeight={700}>{qtdCetek}</Text>
        </Box>
        <Box flex={1} alignItems={'center'} backgroundColor={COLORS.orange[50]} padding={2} borderRadius={4} borderWidth={1} borderColor={COLORS.orange[400]}>
          <Text color={COLORS.blue[700]} fontSize={18} fontWeight={700}>Focus</Text>
          <Text color={COLORS.blue[700]} fontSize={24} fontWeight={700}>{qtdFocus}</Text>
        </Box>
        <Box flex={1} alignItems={'center'} backgroundColor={COLORS.orange[50]} padding={2} borderRadius={4} borderWidth={1} borderColor={COLORS.orange[400]}>
          <Text color={COLORS.blue[700]} fontSize={18} fontWeight={700}>Home</Text>
          <Text color={COLORS.blue[700]} fontSize={24} fontWeight={700}>{qtdWR}</Text>
        </Box>
      </HStack>
    </Box>
  )
}
export default ChamadosHeader;