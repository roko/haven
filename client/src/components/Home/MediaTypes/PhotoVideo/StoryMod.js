import React from 'react';
import DialogInput from 'react-native-dialog-input';

export const StoryMod = () => {
    return (
<DialogInput isDialogVisible={this.state.isDialogVisible}
            title={"Add a Story"}
            message={"Message for DialogInput #1"}
            hintInput ={"This was the day that..."}
            submitInput={ (inputText) => {this.sendInput(inputText)} }
            closeDialog={ () => {this.showDialog(false)}}>
</DialogInput>
    )
}