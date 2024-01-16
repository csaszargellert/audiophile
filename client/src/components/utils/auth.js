import { axiosBase, axiosPrivate } from './axios';
import jwt_decode from 'jwt-decode';

class AuthProvider {
  #jwt = null;
  #roles = null;
  #id = null;
  #isAuthenticated = false;
  #productsId = null;

  get jwt() {
    return this.#jwt;
  }

  get roles() {
    return this.#roles;
  }

  get id() {
    return this.#id;
  }

  get isAuthenticated() {
    return this.#isAuthenticated;
  }

  get productsId() {
    return this.#productsId;
  }

  set #Jwt(value) {
    this.#jwt = value;
  }

  set #IsAuthenticated(value) {
    this.#isAuthenticated = value;
  }

  set #Id(value) {
    this.#id = value;
  }

  set #Roles(value) {
    this.#roles = value;
  }

  set productsId(value) {
    this.#productsId = value;
  }

  async signout() {
    try {
      await axiosPrivate({
        method: 'POST',
        url: '/auth/signout',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } finally {
      this.#updateFields(null, null, null, null, false);
    }
  }

  async signin(email, password) {
    const response = await axiosBase({
      method: 'POST',
      url: '/auth/signin',
      data: {
        email,
        password,
      },
    });

    const { jwt } = response.data;

    const { roles, userId, productsId } = this.#decodeJwt(jwt);

    this.#updateFields(jwt, roles, productsId, userId, true);
  }

  async signup(username, email, password, confirmPassword) {
    await axiosBase({
      method: 'POST',
      url: '/auth/signup',
      data: {
        username,
        email,
        password,
        confirmPassword,
      },
    });
  }

  setJwt(jwt) {
    this.#Jwt = jwt;
  }

  #decodeJwt(jwt) {
    return jwt_decode(jwt);
  }

  #updateFields(jwt, roles, productsId, id, isAuthenticated) {
    this.#Jwt = jwt;
    this.#Roles = roles;
    this.#IsAuthenticated = isAuthenticated;
    this.#Id = id;
    this.productsId = productsId;
  }
}

export default new AuthProvider();
