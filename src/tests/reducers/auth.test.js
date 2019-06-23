import authReducer from '../../reducers/auth';

test('should set uid for login', () => {
    const state = authReducer(undefined, {type: 'LOGIN', uid: 'test123'});
    expect(state).toEqual({uid: 'test123'});
});

test('should clear uid for logout', () => {
    const state = authReducer({uid: 'test123'}, {type: 'LOGOUT'});
    expect(state).toEqual({});
});