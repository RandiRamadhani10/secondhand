/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import {device, element} from 'detox';

describe('Authentication Test Case', () => {
  const randomNumber = Math.floor(Math.random() * 100);

  const dataUser = {
    name: `Binarian`,
    email: `binarianuserdev@gmail.com`,
    password: `binarianuserdev`,
  };

  const component = {
    // name: element(by.label('Name')),
    email: element(by.label('Email')),
    password: element(by.label('Password')),
    // iconTogglePassword: element(by.label('icon-toggle-password')),
    // btnCreateAccount: element(by.text('Create Account')),
    btnCTALogin: element(by.text('Masuk')),
    // btnCTARegister: element(by.text('Register')),
    // btnBackToLogin: element(by.label('button-Back to Login')),
    // messageVerification: element(by.label('message-send-verification')),
    // btnLogin: element(by.text('Login')),
    // greeting: element(by.text(`Hello, ${dataUser.name}`)),
  };

  beforeAll(async () => {
    await device.launchApp();
  });

  //   describe('Register Success', () => {
  //     it('should have field "Name" and can input value', async () => {
  //       await expect(component.name).toBeVisible();
  //       await component.name.typeText(dataUser.name);
  //       await expect(component.name).toHaveText(dataUser.name);
  //     });

  //     it('should have field "Email" and can input value', async () => {
  //       await expect(component.email).toBeVisible();
  //       await component.email.replaceText(dataUser.email.toLowerCase());
  //       await expect(component.email).toHaveText(dataUser.email.toLowerCase());
  //     });

  //     it('should have field "Password" and can input value', async () => {
  //       await expect(component.password).toBeVisible();
  //       await component.password.typeText(dataUser.password);
  //       await component.iconTogglePassword.tap();
  //       await expect(component.password).toHaveText(dataUser.password);
  //     });

  //     it('should have button Create Account', async () => {
  //       await expect(component.btnCreateAccount).toBeVisible();
  //     });

  //     it('should have button CTA to Login', async () => {
  //       await expect(component.btnCTALogin).toBeVisible();
  //     });

  //     it('should Success Registered Account', async () => {
  //       await component.btnCreateAccount.tap();
  //       await expect(component.messageVerification).toBeVisible();
  //       await component.btnBackToLogin.tap();
  //     });
  //   });

  describe('Login Success', () => {
    it('should have field "Email" and can input value', async () => {
      await expect(component.email).toBeVisible();
      await component.email.replaceText(dataUser.email.toLowerCase());
      await expect(component.email).toHaveText(dataUser.email);
    });

    it('should have field "Password" and can input value', async () => {
      await expect(component.password).toBeVisible();
      await component.password.typeText(dataUser.password);
      await component.iconTogglePassword.tap();
      await expect(component.password).toHaveText(dataUser.password);
    });

    it('should have button Login', async () => {
      await expect(component.btnLogin).toBeVisible();
    });

    // it('should have button CTA to Register', async () => {
    //   await expect(component.btnCTARegister).toBeVisible();
    // });

    // it('should Success Registered Account and navigate to Home', async () => {
    //   await component.btnCTALogin.tap();
    //   await expect(component.greeting).toBeVisible();
    // });
  });
});
