# MineCore

## ブランチ

master ブランチにマージするブランチはバージョンをブランチ名にする。<br />
該当ブランチを作成時`.github/workflows/deploy` ファイル内 docker image tag のバージョンを変更する。<br />
<br />
その他各種ブランチ名は`issue/account`と命名する。<br />

<br />

## バージョン管理

- メジャーバージョン: 新規 features の追加
- マイナーバージョン: 機能更新
- パッチバージョン: バグ修正、リファクタリング

<br />

## デプロイ

`master`ブランチに push すると自動的で[ghcr](https://github.com/features/packages)にパッケージをデプロイする。<br />

<br />

## テスト

pull request を作成すると web, api 共に build テストを行う。<br />
