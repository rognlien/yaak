# Developer Setup

Yaak is a combined Node.js and Rust monorepo. It is a [Tauri](https://tauri.app) project, so 
uses Rust and HTML/CSS/JS for the main application but there is also a plugin system powered
by a Node.js sidecar that communicates to the app over gRPC.

Because of the moving parts, there are a few setup steps required before development can 
begin.

## Prerequisites

Make sure you have the following tools installed:

- [Node.js](https://nodejs.org/en/download/package-manager)
- [Rust](https://www.rust-lang.org/tools/install)

Check the installations with the following commands:

```shell
node -v
npm -v
rustc --version
```

Install the NPM dependencies:

```shell
npm install
```

Run the `bootstrap` command to do some initial setup:

```shell
npm run bootstrap
```

## Run the App

After bootstrapping, start the app in development mode:

```shell
npm start
```

## Building the App

To build a release binary for your current platform:

```shell
npx tauri build --bundles app
```

This creates a bundled application at `target/release/bundle/macos/Yaak.app` (macOS) or equivalent for your platform.

To also generate an installer (DMG on macOS, NSIS on Windows):

```shell
npx tauri build --bundles app,dmg
```

Build output locations:

| Platform | App | Installer |
|----------|-----|-----------|
| macOS | `target/release/bundle/macos/Yaak.app` | `target/release/bundle/dmg/Yaak_<version>_<arch>.dmg` |
| Windows | `target/release/bundle/nsis/` | `target/release/bundle/nsis/Yaak_<version>_<arch>-setup.exe` |
| Linux | `target/release/bundle/appimage/` | `target/release/bundle/deb/` or `target/release/bundle/rpm/` |

To run the built macOS app:

```shell
open target/release/bundle/macos/Yaak.app
```

_Note: Local builds are unsigned. On macOS, you may need to right-click the app and select "Open" to bypass Gatekeeper, or allow it in System Settings > Privacy & Security._

## SQLite Migrations

New migrations can be created from the `src-tauri/` directory:
   
```shell
npm run migration
```

Rerun the app to apply the migrations. 

_Note: For safety, development builds use a separate database location from production builds._

## Lezer Grammar Generation

```sh
# Example
lezer-generator components/core/Editor/<LANG>/<LANG>.grammar > components/core/Editor/<LANG>/<LANG>.ts
```

## Linting & Formatting

This repo uses Biome for linting and formatting (replacing ESLint + Prettier).

- Lint the entire repo:

```sh
npm run lint
```

- Auto-fix lint issues where possible:

```sh
npm run lint:fix
```

- Format code:

```sh
npm run format
```

Notes:
- Many workspace packages also expose the same scripts (`lint`, `lint:fix`, and `format`).
- TypeScript type-checking still runs separately via `tsc --noEmit` in relevant packages.
