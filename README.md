# Getting Started

```bash
git clone https://github.com/tmthan/onlylink-front-end.git
```

## Prepare

IDE: `VS Code`

Các extensions cần cài đặt:
[ES Lint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint),
[Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode),
[Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

[http://localhost:8080](http://localhost:8080)

## Run

Install package:

```bash
yarn install
```

Run the development server:

```bash
yarn dev
```

## Kiểm tra sẵn sàng deploy

Build project

```bash
yarn build
```

Build docker

```bash
docker build -t onlylink-frontend .
```

Run docker

```bash
docker run -p 8080:8080 onlylink-frontend
```

## Lưu ý

Không tự ý thay đổi file `yarn.lock`

Nếu có thay đổi file config của tailwind thì cân stop và run lại thì mới apply css mới

## Rules

### Quy tắc đặt tên:

- `ComponentName`, ví dụ: `function FilterBar() {}`, `<FilterBar />`, `FilterBar.tsx`
- `TypeName`, ví dụ: `type FilterBarProps = {}` hoặc `interface FilterBarProps {}`
- `EnumName`, ví dụ: `enum MenuType { BREAK_POINT = 'break_point' }` hoặc `enum MenuType { BreakPoint = 'BreakPoint' }`
- `ClassName`, ví dụ `class UserService {}`, `UserService.ts`
- `useHookName`, ví dụ: `useDebounce`, `useDebounce.ts`, `useDebounce.tsx`
- `helperFunction`, ví dụ: `getUserInfo()`, `getUserInfo.ts`
- `CONSTANT_NAME`, ví dụ: `STATUS_SUCCESS = 1`. Lưu ý, `CONSTANT` sử dụng cho những hằng số đã được thiết lập từ đầu (ex: magic number), không phải dùng cho biến được lấy từ một method (`const user = getUser()`)
- `variableName`, ví dụ: `const user = getUser()`, `let user = getUser()`
