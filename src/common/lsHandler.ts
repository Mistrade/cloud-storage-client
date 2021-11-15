interface LocalStorageHandler {
  getItem: <T = any>( key: keyof LocalStorageKeys ) => T | null,
  saveItem: ( key: keyof LocalStorageKeys, data: any ) => void,
  remove: ( key: keyof LocalStorageKeys ) => Promise<void>
}

interface LocalStorageKeys {
  AuthErrorObject: string
}

export const LSKeys: LocalStorageKeys = {
  AuthErrorObject: 'AuthErrorObject'
}

export const LsHandler: LocalStorageHandler = {
  getItem: ( key ) => {
    const item = localStorage.getItem( LSKeys[ key ] )

    if( item ) {
      return JSON.parse( item )
    } else {
      return null
    }
  },
  saveItem: async ( key, data ) => {
    return localStorage.setItem( LSKeys[ key ], JSON.stringify( data ) )
  },
  remove: async ( key ) => {
    return localStorage.removeItem( LSKeys[ key ] )
  }
}