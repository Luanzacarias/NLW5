import React from 'react';
import {StyleSheet, Text, TouchableOpacity, TouchableOpacityProps} from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

//fazer a tipagem dele (para conseguir aceitar as propriedades dos outros arquivos[como onPress])
interface ButtonProps extends TouchableOpacityProps {
    title: string,
}

// aceitar title como pedido em ButtonProps
// ...rest pra pegar tds as outras propriedades
export function Button({title, ...rest} : ButtonProps){
    return(
        <TouchableOpacity 
            style={styles.conteiner}
            // pra pegar as propriedades e aplicar (smp ele por último)
            {...rest}
        >
            <Text style={styles.text}>
                {title}
            </Text>
        </TouchableOpacity> 
    )
}

const styles = StyleSheet.create({
    conteiner:{
        backgroundColor: colors.green,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        fontSize: 16,
        color: colors.white,
        fontFamily: fonts.heading
    }
});