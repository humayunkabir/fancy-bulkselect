# fancy-bulkselect
Bulk select allows users to check multiple checkboxes at once and toggles a UI for bulk actions to be performed for the selected items.

##### **Bulk select consist of four main parts:**
1. The main checkbox, which is used for checking all the other checkboxes, the class `checkbox-bulk-select` is used to define that item.
2. The target checkboxes are wrapped using a unique id, in this example `bulk-select-body`. Every targeted checkbox within this wrapper is marked as `checkbox-bulk-select-target`. The id  `bulk-select-body` is used to hook it to the main checkbox with `data-checkbox-body="#bulk-select-body`
3. The element with id `bulk-select-actions` will be toggled by checking the main checkbox, which is hooked using `data-checkbox-actions="#bulk-select-actions`
4. Bulk select actions will be replaced with the content of 
  `bulk-select-replace-element` id, which is hooked using `data-checkbox-replaced-element="#bulk-select-replace-element

![bulk-select](docs/img/bulk-select.png)
