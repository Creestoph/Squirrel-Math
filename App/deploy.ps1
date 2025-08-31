Write-Host "Remember to set productionMode for editor/nodes/BuiltInComponent.vue first" -ForegroundColor Red
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown');

# firebase tools need to be installed first via: npm install -g firebase-tools
firebase login --reauth # the project is assigned to oblicze.calki@gmail.com / Bozapomne
npm run build
firebase deploy
