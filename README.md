# Bianca Blog

这是一个可以直接发布到 GitHub Pages 的个人博客模板，风格参考你提供的站点：文章列表、按年月归档、搜索、标签、About 页面和深色模式。

## 上传到 GitHub

1. 在 GitHub 新建公开仓库，仓库名必须是 `你的用户名.github.io`。
2. 把本文件夹内的全部文件上传到仓库根目录（不要只上传文件夹本身）。
3. 打开仓库 `Settings → Pages`。
4. 在 `Build and deployment` 中选择 `Deploy from a branch`，Branch 选择 `main` 和 `/ (root)`，点击 `Save`。
5. 等待几分钟，访问 `https://你的用户名.github.io`。

## 发布新文章

1. 在 `data/posts.json` 最前面增加一条文章记录，日期使用 `YYYY-MM-DD`。
2. 按年份和月份建立文件，例如 `posts/2026/09/my-new-post.html`。
3. 把 `slug` 写成 `my-new-post`，它必须和 HTML 文件名一致。
4. 图片放到 `assets/images/`，然后在文章 HTML 中使用：

```html
<figure>
  <img src="assets/images/你的图片.jpg" alt="图片说明">
  <figcaption>图片说明</figcaption>
</figure>
```

## 更换头像

当前模板使用字母 B 头像。你可以把 `assets/images/bianca-placeholder.svg` 换成自己的图片，并在三个页面的 `.avatar` 区域改成 `<img>`。

## 图片建议

建议使用 JPG 或 WebP，每张照片压缩到 300KB—1MB 左右。不要上传私人证件、住址等敏感内容，因为 GitHub Pages 网站默认公开。
