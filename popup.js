document.addEventListener('DOMContentLoaded', function() {
    var commandList = document.getElementById('commandList');
    var commandDescription = document.getElementById('commandDescription');

    // commands.jsonからデータを非同期で読み込む
    fetch(chrome.runtime.getURL('commands.json'))
        .then(function(response) {
            return response.json();
        })
        .then(function(commands) {
            // 読み込んだデータを使用してselect要素にオプションを追加する
            for (var command in commands) {
                var commandDiv = document.createElement('div');
                commandDiv.className = 'command-item';

                var keySpan = document.createElement('span');
                keySpan.className = 'command-key';
                keySpan.textContent = command;

                var valueSpan = document.createElement('span');
                valueSpan.className = 'command-value';
                valueSpan.textContent = commands[command];

                commandDiv.appendChild(keySpan);
                commandDiv.appendChild(valueSpan);
                commandList.appendChild(commandDiv);
            }
        })
        .catch(function(error) {
            console.error('データの読み込み中にエラーが発生しました:', error);
        });
});
