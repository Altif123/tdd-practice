const { deepStrictEqual } = require('assert');
const assert = require('assert');
const Money = require('./money')
const Portfolio = require('./portfolio')



class MoneyTest{
    testMultiplication(){
        let tenEuros = new Money(10,"EUR");
        let twentyEuros = new Money(20, "EUR");
        deepStrictEqual(tenEuros.times(2), twentyEuros);
    }
    testDivision(){
        let originalMoney = new Money(4002, "KRW");
        let acctualMoneyAfterDivision = originalMoney.divide(4);
        let expectMoneyAfterDivision = new Money(1000.5, "KRW");
        assert.deepStrictEqual(acctualMoneyAfterDivision, expectMoneyAfterDivision) 
    }
    testAddition(){
        let fiveDollars = new Money(5, "USD");
        let tenDollars = new Money(10, "USD");
        let fifteenDollars = new Money(15,"USD");
        let portfolio = new Portfolio;
        portfolio.add(fiveDollars, tenDollars);
        assert.deepStrictEqual(portfolio.evaluate("USD"), fifteenDollars);

    }
    runAllTests(){
        let testMethods = this.getAllTestMethods();
        testMethods.forEach(m =>{
            console.log("Running: %s()" , m)
            let method = Reflect.get(this,m);
            try{
                Reflect.apply(method, this, []);
            }catch (e){
                if (e instanceof assert.AssertionError){
                    console.log(e);
                }else{
                    throw e;
                }
            }
            
        });
    }  

    getAllTestMethods(){
        let moneyPrototype = MoneyTest.prototype;
        let allProps = Object.getOwnPropertyNames(moneyPrototype);
        let testMethods = allProps.filter(p => {
            return typeof moneyPrototype[p] ==='function' && p.startsWith("test");
        });
        return testMethods;
    }
}
new MoneyTest().runAllTests();

