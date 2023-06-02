// let info:{
//     'officeId':number,
//     'isOpened':boolean,
//     contacts:{
//         'phone':string,
//         'email':string,
//         'address':{
//             'city':string
//         }
//     }
// }={
//     "officeId": 45,
//     "isOpened": false,
//     "contacts": {
//         "phone": "+79100000000",
//         "email": "my@email.ru",
//         "address": {
//             "city": "Москва"
//         }
//     }
// }

//
// /* Запрос */
// {
//     "topicId": 5,
//     "status": "published" // "draft", "deleted" -optional
// }
// /* Ответ */
// [
//     {
//         "question": "Как осуществляется доставка?",
//         "answer": "быстро!",
//         "tags": [
//             "popular",
//             "new"
//         ],
//         "likes": 3,
//         "status": "published"
//     }
// ]
//
// enum QuestionStatus{
//     PUBLISHED='published',
//     DRAFT='draft',
//     DELETED='deleted'
// }
//
// async function getFaqs(req:{
//     topicId:number;
//     status:QuestionStatus
// }):Promise<{
//     question:string,
//     answer:string,
//     tags:string[],
//     likes:number;
//     status:QuestionStatus;
// }[]> {
// 	const res:Response = await fetch('/faqs', {
// 		method: 'POST',
// 		body: JSON.stringify(req)
// 	});
// 	const data = await res.json();
// 	return data;
// }
//
// type Status='success'|'failed'
// type UserId=2|4;
// type Sum=number
// interface Data {
//     databaseId:number,
//     sum:Sum,
//     from:UserId
//     to:UserId
// }
//
// interface Response {
//     sum:Sum,
//     from:UserId,
//     to:UserId
// }
// interface Request {
//     status:Status
//     data:Data
// }

//
// interface IPayment{
//     sum:number,
//     from:number,
//     to:number
// }
//
// enum PaymentStatus {
//     SUCCESS='success',
//     FAILED='failed'
// }
// interface IPaymentsRequest extends IPayment{
//     timeRequest:Date
// }
//
// // interface IDataSuccess {
// //     databaseId:number;
// //     sum:number;
// //     from:number;
// //     to:number;
// // }
// //
// // interface IDataFailed {
// //     errorMessage:string
// //     errorCode:number
// // }
// //
// // interface IResponse {
// //     status:PaymentStatus;
// //     data:IDataSuccess|IDataFailed
// // }
// // //с точки зрения типов не правильно, потому что мы предполагаем что может быть статус success,
// // // а дата error(Failed)
//
//
// interface IDataSuccess extends IPayment{
//     databaseId:number;
//
// }
//
// interface IResponseSuccess{
//     status:PaymentStatus.SUCCESS
//     data:{
//         databaseId:number
//         sum:number
//         from:number
//         to:number
//     }
// }
// interface IResponseFailed {
//     status:PaymentStatus.FAILED
//     data:{
//         errorMessage:string
//         errorCode:number
//     }
// }
//
// function get():IResponseSuccess|IResponseFailed {
//     return {
//         status:PaymentStatus.SUCCESS,
//         data:{
//             databaseId:111,
//             sum:1000,
//             from:2,
//             to:1
//         }
//     }
// }
//
//
