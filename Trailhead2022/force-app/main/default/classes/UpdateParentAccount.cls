/**
 * Created by Alexis MASSON on 17/09/2019.
 */

/**
 * From TRAILHEAD asynchrone https://trailhead.salesforce.com/content/learn/modules/asynchronous_apex/async_apex_queueable
 */
public class UpdateParentAccount implements Queueable {

    // noter qu'ils sont en privé (pas en public, et surtout impossible d'être en global pour constructeurs)
    private List<Account> accounts;
    private ID parent;

    // constructeur
    public UpdateParentAccount(List<Account> records, ID id) {
        this.accounts = records;
        this.parent = id;
    }
    public void execute(QueueableContext context) {
        for (Account account : accounts) {
            account.parentId = parent;
            // perform other processing or callout
        }
        update accounts;
    }

}