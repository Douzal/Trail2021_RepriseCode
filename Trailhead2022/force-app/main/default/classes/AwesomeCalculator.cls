/**
 * Created by Alexis MASSON on 16/10/2019.
 */

/**
 * https://trailhead.salesforce.com/fr/content/learn/modules/apex_integration_services/apex_integration_soap_callouts
 */
public class AwesomeCalculator {
    public static Double add(Double x, Double y) {
        calculatorServices.CalculatorImplPort calculator =
                new calculatorServices.CalculatorImplPort();
        return calculator.doAdd(x,y);
    }
}