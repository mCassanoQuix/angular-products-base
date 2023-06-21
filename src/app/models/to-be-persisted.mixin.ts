type ToBePersisted<T extends {id: number}> = Omit<T, 'id'>

export default ToBePersisted
