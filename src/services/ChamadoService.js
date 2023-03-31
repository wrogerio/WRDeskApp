import firestore from '@react-native-firebase/firestore';

export const GetChamadosAtivos = async () => {
  const chamadoCollection = await firestore().collection('chamados-list')
  const chamados = await chamadoCollection.where('status', '!=', 'Finalizado').get();
  const chamadosList = chamados.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });

  return chamadosList;
}

export const GetChamadosEncerrados = async () => {
  const chamadoCollection = await firestore().collection('chamados-list')
  const chamados = await chamadoCollection.where('status', '==', 'Finalizado').get();
  const chamadosList = chamados.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });

  return chamadosList;
}

export const UpdateChamado = async (chamado) => {
  const chamadoCollection = await firestore().collection('chamados-list')
  const chamadoDoc = await chamadoCollection.doc(chamado.id);
  await chamadoDoc.update(chamado);
}

export const CreateChamado = async (chamado) => {
  const chamadoCollection = await firestore().collection('chamados-list')
  await chamadoCollection.add(chamado);
}

export const DeleteChamado = async (chamado) => {
  const chamadoCollection = await firestore().collection('chamados-list')
  const chamadoDoc = await chamadoCollection.doc(chamado.id);
  await chamadoDoc.delete();
}