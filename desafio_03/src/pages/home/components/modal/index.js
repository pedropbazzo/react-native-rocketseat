/* Core */
import React, { Component } from 'react';

/* Presentational */
import { ActivityIndicator, View, Modal, Text, TextInput, TouchableOpacity } from 'react-native';

/* Redux */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hideModal, searchUser } from 'redux/ducks/modal';

/* Components */
import MyButton from '../button';

/* Styles */
import styles from './styles';
import { colors, fonts,} from 'styles';

class MyModal extends Component {
  state= {
    user: '',
  };

  searchUserAndSave = (name, local) => {
    if (!name.length) return;
    this.props.searchUser(name, local);
    this.setState({ user: '' });
  }

  render() {
    const { status, local } = this.props;
    return (
      <Modal
        // onRequestClose={() => {}}
        animationType="fade"
        transparent={true}
        visible={status}
        onDismiss={() => {}}
      >
        <View style={styles.container}>
          <View style={styles.box}>
            { this.props.loading
            ? <ActivityIndicator size="small" color={colors.dark} style={styles.loading} />
            : <View>
                <View style={styles.headerModal}>
                  <Text style={styles.title}>Quer adicionar novo local ?</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Digite um usuário do Github"
                    value={this.state.user}
                    onChangeText={text => this.setState({ user: text })}
                  />
                </View>
                <View style={styles.footerModal}>
                  <TouchableOpacity onPress={() => this.props.hideModal()}>
                    <MyButton title="Cancelar" bg="Cancel" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.searchUserAndSave(this.state.user, local)}>
                    <MyButton title="Salvar" bg="Save" />
                  </TouchableOpacity>
                </View>
              </View>
            }
          </View>
        </View>
      </Modal>
    );
  }
}
/* Pega o global state para o props */
const mapStateToProps = state => ({
  modal: state.modal,
  loading: state.modal.loading,
});

/* Pega func para o props */
const mapDispatchToProps = dispatch =>
  bindActionCreators({ hideModal, searchUser }, dispatch);

/* Connecta os dois, podendo ser null */
export default connect(mapStateToProps, mapDispatchToProps)(MyModal);
