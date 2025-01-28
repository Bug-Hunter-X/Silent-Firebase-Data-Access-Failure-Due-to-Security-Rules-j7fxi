The solution involves improved error handling to detect and report silent access denials.

```javascript
firebase.database().ref('privateData').once('value').then(snapshot => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    // Check for the absence of data which might suggest a permissions issue
    console.error('Data not found. Check Firebase security rules.');
  }
}).catch(error => {
  console.error('Error fetching data:', error);
  // Add more specific error handling to check for permission errors
  if (error.code === 'PERMISSION_DENIED') {
    console.error('Permission denied. Check Firebase security rules for this client.');
  }
});
```

This solution adds checks for the absence of data, which could indicate a permissions issue.  Furthermore, it explicitly checks the `error.code` for 'PERMISSION_DENIED' within the `catch` block, providing a more informative message for debugging.