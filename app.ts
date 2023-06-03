// **********************************-07- Generic - Дженерики*******************************
// **********************************-07- Generic - Дженерики*******************************
// **********************************-07- Generic - Дженерики*****************************/

//****************************Mixins***********************************
//****************************Mixins***********************************
//****************************Mixins***********************************
// Миксины реалиуются как наследование от нескольких классов
// Либо добавление примесы дополнительных свойств, тому или иному обьекту без явного наследования
//используются активно в DCI тестировании
//
// type Constructor= new(...args:any[])=>{
//
// }
// type GConstructor<T={}>=new(...args:any[])=>{
// }
// class List{
//     constructor(public items:string[]) {
//     }
// }
//
// type ListType=GConstructor<List>;
//
// class ExtendedListClass extends List{
//     first(){
//         return this.items[0];
//     }
// }
//
// function E() {
//
// }


//*****************************************************generic классы**************************
//*****************************************************generic классы**************************
// дженерики в классе полезны когда есть некоторые универсальные верхние части обьекта, такие как status code и тп
// а внутри есть переменные поля, которые зависят от реализации

//
// class Resp<D,E> {
//     data?:D;
//     error?:E;
//
//     constructor(data?:D,error?:E) {
//         if(data){
//             this.data=data
//         }
//         if(error){
//             this.error=error;
//         }
//     }
// }
//
//
// const res=new Resp<string,number>('data',0)
//
// class HttpResp extends Resp<string,number>{
//     code:number;
//     setCode(code:number){
//         this.code=code;
//     }
// }
//
// const res2=new HttpResp();
// res2.code

//*****************************************************ограничение generic**************************
//*****************************************************ограничение generic**************************
// мы не можем работать с genericом как с определенным типом, и обращаться например к его свойствам

// class Vehicle{
//     run:number;
// }
// interface Vehicle{
//     run:number;
// }
//
// function kmToMiles<T extends Vehicle>(vehicle:T) {
//     vehicle.run=vehicle.run/0.62;
//     return vehicle
// }
//
// class LCV extends Vehicle{
//     capacity:number;
// }
// interface LCV extends Vehicle{
//     capacity:number;
// }
// const vehicle=kmToMiles(new Vehicle());
// const lcv=kmToMiles(new LCV());
//
//
// function logId<T extends string|number>(id:T):T {
//     console.log(id)
//     return id;
// }function logId1<T extends string|number,Y>(id:T,additionalData:Y):{id:T,data:Y} {
//     console.log(id)
//     return {id,data:additionalData};
// }



//***********************функция сортировки любых обьектов, которые имеют id по убыванию и возрастанию


// const data=[
// {id:1,name:'dma1'},
// {id:2,name:'dma2'},
// {id:3,name:'dma3'},
// ]
//
// interface ID{
//     id:number;
// }
//
// function sort<T extends ID>(data:T[],type:'asc'|'desc'='asc'):T[] {
//     return data.sort((a,b)=>{
//         switch (type) {
//             case "asc":
//                 return a.id - b.id
//
//             case "desc":
//                 return b.id-a.id
//         }
//     })
// }
//
// console.log(sort(data))
// console.log(sort(data,'desc'))

// ***************************************Использование в типах***************************************
// ***************************************Использование в типах**************************
//
// interface ILogLine<T> {
//     timeStamp:Date;
//     data:T
// }
//
// type LogLineType<T>={
//     timeStamp:Date;
//     data:T
// }
//
// const logLine:LogLineType<{ a: number }>={
//     timeStamp: new Date(),
//     data:{
//         a:1
//     }
// }



//***функция преобразования в строку

// function toString<T>(data:T):string|undefined {
//     if(Array.isArray(data)){
//         return data.toString();
//     }
//     switch (typeof data) {
//         case "string":
//             return data;
//         case 'number':
//         case "symbol":
//         case "bigint":
//         case "boolean":
//         case "function":
//             return data.toString();
//         case "object":
//             return JSON.stringify(data);
//         default:
//             return undefined;
//
//     }
// }
//
// console.log(toString(3))
// console.log(toString({'1':'2','3':'4'}))
// console.log(toString(true))
//
//

//*************************Встроенные generики***********
//благодяря дженерику мы можем делать универсальные фции с точки зрения типов

// const num:Array<number>=[1,2,3]
//
// async function test() {
//     const a=await new Promise<number>((resolve, reject)=>{
//         resolve(1)
//     })
// }
//
// //правильная типизация , не ограниченного числом строк и значений обьекта
// const check:Record<string,boolean>={
//     drive:true,
//     kpp:false
// }
//
//
// function logMiddleware<T>(data:T):T {
//     console.log(data)
//     return data;
// }
//
// const res=logMiddleware<number>(10);
//
//
// function getSplitedHalf<T>(data:Array<T>):Array<T> {
//     const length=data.length/2;
//     return data.splice(0,length)
// }
//
// getSplitedHalf<number|string|boolean>([1,'2','3',true,33n])
//
//

/*****************************************-04-ПРОДВИНУТЫЕ ТИПЫ**************************************
 /*****************************************ПРОДВИНУТЫЕ ТИПЫ**************************************
 /*****************************************ПРОДВИНУТЫЕ ТИПЫ**************************************/


 // **********************Type Guard******************************************************************
    // *******************Type Guard***************************************************************/
//
// function logId(id:string|number) {
//     if(isString(id)) console.log(id)
//     else console.log(id+' - not string')
// }
//
// function isString(x:string|number):x is string {
//     return typeof x==='string'
// }
//
// interface User{
//     name:string,
//     login:string,
//     id:number
// }
// interface Admin{
//     name:string;
//     role:number;
//     position:string
// }
// //роль есть только у админа, и таким методом можно проверить что это точно админ
// function isAdmin(user: User|Admin):user is Admin {
//     return 'role' in user
// }
//
// function isAdminAlternative(user:User|Admin):user is Admin {
//     return (user as Admin).role !==undefined
// }
// //Этот метод юзаем когда не можем добраться до role in user, в некоторых случаях
//
// function setPosition(user:User|Admin) {
//     if(isAdmin(user)) user.position='developer'
//     // else user.id=1;
//     else throw new Error('User is not Admin')
// }
//
//



 //********************************************************UNION*************************************
 //********************************************************UNION*************************************/

// const arr=['log',1]
// //сужение типов, будем пользоваться достаточно часто
// function logId(id:string|number|boolean) {
//     if(typeof id==='string') console.log(id.toUpperCase())
//     if(typeof id==='number') console.log(id.toFixed(2))
//     else console.log(id)
// }
// logId(1)
// logId('log')
// logId(true)
//
// //таким образом в юнион типах мы можем исключить то что является массивом
// function logError(err:string|string[]) {
//     if(Array.isArray(err)) return err.map(e=>{
//         console.log(e)
//     })
//     else console.log(err)
// }
//
// // таким образом можно сужать типы для юнион обьектов
// function logObject(obj:{a:number}|{b:number}) {
//     if('a'in obj) console.log(obj.a)
//     //будет показан вариант толкьо а, в случае else -только b
//     else console.log(obj.b)
// }
//
// function logMultipleIds(a:string|number,b:string|boolean) {
//     if(a===b)a.toUpperCase()
//     //в этом случае будет только строкой, поскольку только эти типы похожи в "а" и "b"
//
// }
//
//
//
// //********************************************************Литеральные типы***********************************
//  //********************************************************Литеральные типы***********************************/
//
// function fetchWithAuth(url:string,method:'post'|'get'): 1| -1 {
//    return -1
// }
// fetchWithAuth('http://localhost:8080','1')
//


//******************************type Aliases**********************************************************
//******************************type Aliases**********************************************************
//
// type httpMethod = 'post' | 'get';
//
// type coolString = string;
//
// function fetchWithAuth(url: string, method: httpMethod): 1 | -1 {
//     return -1
// }
//
// fetchWithAuth('http://localhost:8080', 'post')
//
//
// type User = {
//     name: string,
//     age: number,
//     skills: string[],
//     married: boolean
// }
//
// type Role = {
//     id: number;
// }
//
// //intersection
// type UserWithRole = User & Role
//
// let user: UserWithRole = {
//     name: 'asd',
//     age: 32,
//     skills: ['1', '2'],
//     married: false,
//     id: 3131313
// }


//******************************Interfaces**********************************************************
//******************************Interfaces**********************************************************
//кроме прочего интерфейсы нужно екстендить,  тайпы через амперсанд
// interface User {
//     name:string,
//     age:number,
//     skills:string[]
//
//     log:(id:number)=>string
// }
//
// interface Role {
//     roleId:number;
// }
//
// interface UserWithRole extends User,Role{
//     createdAt:Date;
// }
//
// let user:UserWithRole={
//     name:'test',
//     age:32,
//     roleId:1,
//     createdAt:new Date(),
//     skills:['skill 1','skill 2'],
//     log(id){
//         return '';
//     }
// }
//
// interface UserDictionary {
//     [index:number]:User
// }
//но в новой версии появился вариант - дженерик Record


//********************************Типы и Интерфейсы - разница*********************************
//********************************Типы и Интерфейсы - разница*********************************


// interface User {
//     name:string
// }

//полезно использовать дополнение если используем какую то библиотеку , и нет возможности писать интерфейс с нуля
// и необходимо доопределить
// например в експрессе тип запоса реквест- взять его , докинуть какие то данные , доопределить
//Type не позвонил так сделать, это отличие тайпа от интерфейса
//Интерфейс нельзя заекстендить от примитивных типов. он позволяет работать с обьектами, с описанием классов
//но никак не с простыми типами
//---------------если подитожить- рекомендации по использованию
// -------------тайп единственный вариант использовать для примитивных типов
// -----------с обьектами всегда интерфейсы, чуть более удобные, так как можно переопределять библиотечные интерфейсы
// -----это ключевые различия
// type ID=string|number;
// interface ID1{
//     ID:string|number
// }
// interface User {
//     age:number
// }
//
// const User:User={
//     name:'2',
//     age:31
// }



// ***********************************Optional*****************************
// ***********************************Optional*****************************/

// interface User{
//     login:string,
//     password?:string;
// }
//
// const user:User={
//     login:'test'
// }
//
// function multiply (first:number,second?:number):number {
//     if(!second){
//         return first*first
//     }
//
//
//
//     return first*second
//     //в этом случае second или number или undefined, но можно сделать проверку и
//     //     будет работать только в случае number
//     // или же можно добавить дефолтное значение second:number=5
// }
//
// multiply(5)
//
// interface UserPro {
//     login:string;
//     password?:{
//         type:'primary'|'secondary'
//     }
// }
//
// function testPass(user:UserPro) {
//     const t=user.password?.type
//         // при получении типа от опционального значения, нужно спросить - есть ли он? если да , то делать проверку
//     const t1=user.password!.type
//     // знак ! даёт понимание что такое значение  100% будет,не будет undefined, берём ответственность на себя
//     //использовать редко, без лишней необоходимости не надо
//
// }
//
//
// function test1(param?:string) {
//     const t=param?? multiply(5)
//     // такое есть и в js и ts , если param null или undefined , то сработает фция multiply
//     //такая проверка удобна для короткой записи
// }
//
//






// ***********************************Void*****************************
// ***********************************Void*****************************

//     function logId(id:string|number):void {
//     console.log(id)
//
// }

// void говорит возвращай всё что угодно  , я просто буду это игнорировать, при работе с методами массивов итп
// типизируем функцию void когда хотим игнорировать возврат
//     в отличии от undefined, которая ждёт только undefined



// ***********************************Unknown****************************
// ***********************************Unknown*****************************
    //unknow - более строгий чем ANY, его нельзя положить в переменную с типом, пока мы сами его не определим,
    // можно его положить только в any
    // при сужении он будет unknow всегда, пока мы явно не проверим
    //в новом тс -ошибка стала unknow , и теперь нельзя обратиться к никакому свойства обьекта,
    // TS2571: Object is of type 'unknown'.
    //в отличнии от any

    // кейсы : с ошибком - где надо использовать явную проверку
    // кейсы : unknown использовать когда вход непонятен для вас, получаем его извне и юзаем вместо any
   //---- в больщинстве своём unknown для таких кейсов и нужен, когда хотим тип но не можем указать, по незнанию

//     async function getDataForce(){
//         try{
//
//         }catch (error) {
//             if(error instanceof Error){
//                 console.log(error.message)
//             }
//             // error.message - ошибка Object is of type 'unknown'.
//             // можно еще явно кастомнуть явно, но можно допустить промашку,еррор может прийти  строкой
//             // const e=error as Error
//         }
// }



// ***********************************Never****************************
// ***********************************Never*****************************
// позволяет описать кейсы где мы никогда не вернёмся
// использовать его для проверки кейсов, пытаться присвоить переменной типа never , кейс в дефолте
// Так как основная цель Тс, исключить ошибки в рантайме, и решить их в компайлед тайм
// так же кейс- исчерпывающая проверка с кейс фции isString- описанной ниже
// если в js рантайме будет что то другое, можно ссылаться на фцию ошибку
// если есть какая то цепочка ифоф, и что то пойти не так, можно сделать прооверку в фцией возвращаюей never
//     function generateError(message:string):never {
//     throw new Error(message)
//     }
//
// function generateError1(message:string):never {
//     throw new Error(message)
// }
//     function isString(x:string|number):boolean {
//         if(typeof x==='string') return true
//         else if( typeof x ==='number') return false
//         generateError1('error')
//     }
//
//
//     function dumpError():never {
//         while (true){}
//     }
//
//     type paymentAction='refund'|'checkout'|'reject';
//     function processAction(action:paymentAction) {
//         switch (action) {
//             case 'refund':
//                 //...
//             break;
//             case 'checkout':
//                 //...
//                 break;
//             default:
//                 //если кейсы не доходят до дефолта, то и ошибка с never подсвечиваться не будет
//                 const _:never=action;
//                 throw new Error('Нет такого action')
//         }
//     }
//
//


// ***********************************Null****************************
// ***********************************Null*****************************
    // null -явно заданный неопределенный обьект, undefined же можно полчить в рамках выполнения нашего кода
    // делаем явный возврат  при неподходящем условии в фции
    // тогда null укажет нам на явное отстутсвтие, undefined же может указать на не ясные данные
    // делаем проверку,  есть или нету, если нету в случае null- будет ошибка, в случае undefined не будет
    //юзаем всегда use strict null check , если нет осознанного обьекта, возрващаем null, null означате что
    // этого обьекта осознанно нет, undefined же укажет что нет свойства и тп, и можно получить его в рантайме


// *********************************************************основы**********************************
// *********************************************************основы**********************************
// let revenue=1000;
// // let bonus='500';
// let bonus:number=500;
// let res:number=revenue+bonus
// // console.log(res)

// function getFullName(firstname:string,surname:string):string {
//     return `${firstname} ${surname}`;
// }

// const getFullNameArrow=(firstname:string,surname:string):string=>{
//     return `${firstname} ${surname}`;
// }
//
// function getFullName(userEntity:{firstname:string,surname:string}):string {
//     return `${userEntity.firstname} ${userEntity.surname}`;
// }
//


//*********************************************************arrays**********************************
//*********************************************************arrays**********************************
//*********************************************************arrays**********************************
//
// const skills:string[]=['DeV','devOps','TechLead'];
//
// // for(const skill of skills){
// //     console.log(skill.toLowerCase())
// // }
//
// const result=skills.filter((s:string)=>s!=='DevOps').map(s=>s+'! ').reduce((a,b)=>a+b)
// console.log(result)

//*********************************************************Tuples - кортежи**********************************
//*********************************************************Tuples - кортежи**********************************
//с точки зрения js- это просто массив
// Кортежи удобны тем что можно ограничить его элементы, но  в него можно пушить , делать pop и тп
// const skill:[number,string]=[1,'Dev'];
// // const id=skill[0];
// // const skillName=skill[1];
// // const q=skill[2]
// const [id,skillName]=skill;
//
// const array:readonly [number,string,...boolean[]]=[1,'test',true,false];


//*********************************************************ENUMS**********************************
//*********************************************************ENUMS**********************************
//енамы во многом себя ведут похоже на обьекты
//КЕЙСЫ - справочник кодов ответа, справочник величин, особенно физический (например влево вправо вверх вниз)
// еще КЕЙСЫ- параметр в базе- имеющий огр. число значение -  роли (админ, юзер, модер)
//
// function compute(){
//     return 3;
// }
// enum Roles{
//     ADMIN=1,
//     USER=ADMIN+1,
//     MODERATOR=compute(),
// }
// enum StatusCode{
//     SUCCESS=1,
//     IN_PROCESS,
//     FAILED,
// }
//
//
// //1 -успех
// //2 - в процессе
// //3 - отклонён
//
// const res={
//     message:'Платёж успешен',
//     statusCode:StatusCode.SUCCESS
// };
//
// //поведение енама как обьекта, таких кейсов мало или нету
// function test(x:{ADMIN:number}) {
//
// }
// test(Roles)
//
// const enum Roles1{
//     ADMIN=1,
//     USER=2
// }
//
// const admin=Roles1.ADMIN
//
const admin = 1 /* Roles1.ADMIN */
// так скомпилируется в jse