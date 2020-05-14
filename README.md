# semi homepage

## ブランチの話
- design_proto
- design_proto内でgulp sass-watchってやるとsassの編集ができるよ
- cssとかのデザインするために置いてるやつ

## ログ排出ルールの話
基本的にerrorが起きたら、ハンドリングするときに注釈をつけてwrap。
個人的に`failed to ***`って感じで統一しました。
実際に`log.Printf()`するのは`handler`で行います。例外的に、リポジトリで出力しているところがあるけど。
### prefixの話
- [error] = サーバ側のエラー
- [warn] = エラーじゃないけど、こんなことが起こったよ。っていう。
    - id指定してリソースを取ってきたけど、中身が空だった。
    - ログインしているか確認するためにcookieから値取ってきたら、空(未ログイン)だった。とか
- [info] = サーバのinfo。あんま見なくていいよ
