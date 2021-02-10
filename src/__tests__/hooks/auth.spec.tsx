import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';

import { AuthProvider, useAuth } from '../../hooks/auth';
import api from '../../services/api';
import { act } from 'react-dom/test-utils';

const apiMock = new MockAdapter(api);

describe('Auth hook', () => {
  it('should be able to sign in', async () => {
    const apiResponse = {
      user: {
        email: 'test@mail.com',
        name: 'test',
        id: 123,
      },
      token: 'token',
    };
    apiMock.onPost('sessions').reply(200, apiResponse);

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({ email: 'test@mail.com', password: '123456' });

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    await waitForNextUpdate();

    expect(result.current.user?.email).toEqual('test@mail.com');
    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:token',
      apiResponse.token,
    );
    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(apiResponse.user),
    );
  });

  it('should restore saved data from storage when auth inits', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@GoBarber:token':
          return 'token';
        case '@GoBarber:user':
          return JSON.stringify({
            email: 'test@mail.com',
            name: 'test',
            id: 123,
          });
        default:
          return null;
      }
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user.email).toEqual('test@mail.com');
  });

  it('should be able to sign out', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@GoBarber:token':
          return 'token';
        case '@GoBarber:user':
          return JSON.stringify({
            email: 'test@mail.com',
            name: 'test',
            id: 123,
          });
        default:
          return null;
      }
    });

    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.signOut();
    });

    expect(result.current.user).toBeUndefined();
    expect(removeItemSpy).toHaveBeenCalledWith('@GoBarber:token');
    expect(removeItemSpy).toHaveBeenCalledWith('@GoBarber:user');
  });

  it('should be able to update user data', () => {
    const testUser = {
      name: 'test',
      email: 'test@mail.com',
      id: 'id',
      avatar_url: 'avatar',
    };

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.updateUser(testUser);
    });

    expect(result.current.user).toEqual(testUser);
    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(testUser),
    );
  });
});
