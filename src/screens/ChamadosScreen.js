// native components
import { useState, useEffect, useLayoutEffect } from 'react';
import { Box, FlatList, Icon, Pressable, Text } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign'
// services
import { GetChamadosAtivos, GetChamadosEncerrados } from '../services/ChamadoService';
import ChamadosHeader from './../components/chamados/ChamadosHeader';
import ChamadosList from './../components/chamados/ChamadosList';
import { COLORS } from './../config/colors';

const ChamadosScreen = ({ navigation, route }) => {
  const [chamados, setChamados] = useState([]);
  const [status, setStatus] = useState('Ativos');

  const changeChamadosTipo = () => {
    if (status === 'Ativos') {
      GetChamadosAtivos().then((chamados) => {
        setChamados(chamados);
      });
    } else {
      GetChamadosEncerrados().then((chamados) => {
        setChamados(chamados);
      });
    }
  };

  const toogleStatus = () => {
    if (status === 'Ativos') {
      setStatus('Encerrados');
    } else {
      setStatus('Ativos');
    }
  }

  useLayoutEffect(() => {
    changeChamadosTipo()

    navigation.setOptions({
      headerRight: () => (
        <Box marginRight={2}>
          <Pressable onPress={e => navigation.navigate("ChamadoFormScreen", { chamado: [] })}>
            <AntDesign name="addfile" size={32} color={COLORS.orange[200]} />
          </Pressable>
        </Box>
      ),
    });
  }, [chamados, status]);

  return (
    <Box flex={1} height={120} paddingX={2}>
      <ChamadosHeader chamados={chamados} status={status} toogleStatus={toogleStatus} />
      <ChamadosList chamados={chamados} navigation={navigation} route={route} />
    </Box>
  )
}
export default ChamadosScreen;