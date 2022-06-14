import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {useForm, Controller} from 'react-hook-form';
import {BaseInput} from '../components';

// import {yupResolver} from '@hookform/resolvers/yup';

// import * as yup from 'yup';

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  //   Schema Example for Yup
  const schema = yup
    .object({
      email: yup.string().email().required('Please input your email'),
      password: yup.string().min(5).required(),
    })
    .required();

  const onSubmit = data => console.log(data);

  return (
    <View>
      <Controller
        control={control}
        rules={{required: true}}
        render={({field: {onChange, onBlur, value}}) => (
          <BaseInput
            label="Email"
            type="text"
            placeholder="Enter your email here"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
          <BaseInput
            label="Email"
            type="text"
            placeholder="Enter your email here"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name="email"
      />
      {errors.email && <Text>{errors.email.message}</Text>}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
