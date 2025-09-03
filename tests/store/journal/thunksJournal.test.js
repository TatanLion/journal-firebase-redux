describe('Pruebas en JournalThunks', () => {

    const dispatch = jest.fn();
    const getState = jest.fn();
    beforeEach( () => jest.clearAllMocks() );

    test('startNewNote debe de crear una nueva nota en blanco', async() => {
        
        getState.mockReturnValue({ auth: { uid: 'TEST-UID' } });

        await startNewNote()( dispatch, getState );
        
    })


})