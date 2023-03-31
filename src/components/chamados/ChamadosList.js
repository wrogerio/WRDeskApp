// styles
import { COLORS } from '../../config/colors';
// native components
import { useState } from 'react';
import { Box, FlatList, Text } from 'native-base';
// custom components
import ChamadoItem from './ChamadoItem';

const ChamadosList = ({ chamados, navigation, route }) => {
  return (
    <Box flex={1}>
      <Text fontSize={24} color={COLORS.orange[300]} fontWeight={'bold'}>Lista de Chamados</Text>
      <FlatList data={chamados}
        keyExtractor={e => e.id}
        renderItem={({ item }) => (
          <ChamadoItem chamado={item} navigation={navigation} route={route} />
        )}
      />
    </Box>
  )
}
export default ChamadosList;