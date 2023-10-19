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
                var option = document.createElement('option');
                option.value = command;
                option.textContent = command;
                commandList.appendChild(option);
            }

            // ユーザーがコマンドを選択したときの処理を定義
            commandList.addEventListener('change', function() {
                var selectedCommand = commandList.value;
                var description = commands[selectedCommand];
                commandDescription.textContent = description;
            });
        })
        .catch(function(error) {
            console.error('データの読み込み中にエラーが発生しました:', error);
        });
});
