import "/style.css"

//　id="add-button"が押された時、
// id="add-text"の内容を取得する。
// id="add-text"のvalueの値に空文字を入れて初期化する
const onClickAdd = () => {
    const inputText = document.getElementById("add-text").value; //取得して
    document.getElementById("add-text").value = ""; //中身を空にして

    createIncompleteTodo(inputText);
}

//渡された引数を元に未完了のtodoを作成する関数
const createIncompleteTodo = (todo) => {
    // li生成
    const li = document.createElement("li"); //li生成

    // div生成
    const div = document.createElement("div"); //divタグ生成して、
    div.className = "list-row"; //クラス名を設定する

    // pタグ生成
    const p = document.createElement("p"); //p生成
    p.className = "todo-item";
    p.innerText = todo; //pの中の文字列は、inputの中の、"add-text"の内容を取得

    // 完了ボタン生成
    const completeButton = document.createElement("button");
    completeButton.innerText = "完了";
    completeButton.addEventListener("click", () => {

        //押された完了ボタンの横にあるliタグ配下の完了ボタンと削除ボタンを削除
        const moveTarget = completeButton.closest("li");
        completeButton.nextElementSibling.remove(); //次の兄弟要素を取得して削除する
        completeButton.remove(); //completeButtonを削除する

        //戻すボタンを生成
        const backButton = document.createElement("button");
        backButton.innerText = "戻す";
        backButton.addEventListener("click", () => {
            // todoの内容を取得し、未完了リストに追加
            const todoText = backButton.previousElementSibling.innerText; //戻るボタンの1個前のinnerTextの要素を取得する※pタグではなく、pタグのinnerText
            createIncompleteTodo(todoText); //未完了リストに追加の関数呼び出し、変数で渡すのは todoTextで取得したpタグの中身のテキスト
            backButton.closest("li").remove();
        });

        moveTarget.firstElementChild.appendChild(backButton); //moveTargetを取得した、1番最初の子要素の中にbackButtonを生成する
        //完了リストに移動
        document.getElementById("complete-list").appendChild(moveTarget); //完了リストの中に今までで処理された、moveTargetを追加する
    });

    
    // 削除ボタン生成
    const deleteButton = document.createElement("button"); //buttonタグを生成
    deleteButton.innerText = "削除"; //中身のテキストは "削除"

    //削除ボタンのクリックイベント
    deleteButton.addEventListener("click", () => {

        //　押されたボタンの親にあるliタグを未完了リストから削除する処理
        const deleteTarget = deleteButton.closest("li"); //押されたボタンの親にあたる「li」タグを探し
        document.getElementById("incompleate-list").removeChild(deleteTarget);
    });

    div.appendChild(p); //divの子要素にpを入れる
    div.appendChild(completeButton); //divの子要素にcompleteButtonを入れる
    div.appendChild(deleteButton); //divの子要素にdeleteButtonを入れる
    li.appendChild(div); //liの子要素にdivを入れる

    // 未完了リストのulに設定したid="incompleate-list"の子要素にliを入れる
    document.getElementById("incompleate-list").appendChild(li);
};

// add-button のクリックイベント
document.getElementById("add-button").addEventListener("click", onClickAdd);