const React = require('react');
const MockReactInstantSearch = jest.genMockFromModule('react-instantsearch-dom');

const fakeHits = [
    {objectID: '1', name: 'testing', link: 'https://www.example.com', images: [{imageUrl: 'www.test.com'}], brand: 'test', price: {currency: '$', value: '9.00'}},
    {objectID: '2', name: 'blp' , link: 'https://www.example.com', images: [{imageUrl: 'www.test.com'}], brand: 'test', price: {currency: '$', value: '9.00'}},
    {objectID: '3', name: 'bli' , link: 'https://www.example.com', images: [{imageUrl: 'www.test.com'}], brand: 'test', price: {currency: '$', value: '9.00'}},
    {objectID: '4', name: 'bla', link: 'https://www.example.com', images: [{imageUrl: 'www.test.com'}], brand: 'test', price: {currency: '$', value: '9.00'}},
    {objectID: '5', name: 'bli' , link: 'https://www.example.com', images: [{imageUrl: 'www.test.com'}], brand: 'test', price: {currency: '$', value: '9.00'}},
    {objectID: '6', name: 'blp' , link: 'https://www.example.com', images: [{imageUrl: 'www.test.com'}], brand: 'test', price: {currency: '$', value: '9.00'}},
    {objectID: '7', name: 'bli' , link: 'https://www.example.com', images: [{imageUrl: 'www.test.com'}], brand: 'test', price: {currency: '$', value: '9.00'}},
    {objectID: '8', name: 'bla' , link: 'https://www.example.com', images: [{imageUrl: 'www.test.com'}], brand: 'test', price: {currency: '$', value: '9.00'}},
    {objectID: '9', name: 'bli' , link: 'https://www.example.com', images: [{imageUrl: 'www.test.com'}], brand: 'test', price: {currency: '$', value: '9.00'}},
    {objectID: '10', name: 'blp' , link: 'https://www.example.com', images: [{imageUrl: 'www.test.com'}], brand: 'test', price: {currency: '$', value: '9.00'}}
];

MockReactInstantSearch.connectHits = Component => () => {
    return (
        <Component hits={fakeHits} />
    )
};

module.exports = MockReactInstantSearch;