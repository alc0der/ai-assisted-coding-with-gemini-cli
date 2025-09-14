
## Tips and Tricks
### Custom commands

````md magic-move
```shell
> nvim .gemini/commands/<optional_group>/<command>.toml
```
```shell
> nvim .gemini/commands/avo/update.toml
```
```toml
description = "Implement Avo"
prompt = """
Write glue code to integrate changes to avo generated code.

"""
```
```toml
description = "Implement Avo"
prompt = """
Write glue code to integrate changes to avo generated code.

The generated code changes are:

!{git diff}

Make use of this json for additonal information about tracking plan:

!{./scripts/export_avo.sh}
"""
```
```toml
description = "Implement Avo"
prompt = """
Write glue code to integrate changes to avo generated code.

The generated code changes are:

!{git diff}

Make use of this json for additonal information about tracking plan:

!{./scripts/export_avo.sh}

**IMPORTANT**: When mapping deals to items for analytics tracking, always use the `mapDealToAnalyticsItem` function.
"""
```
```shell
╭───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ > /avo:imp                                                                                                                │
╰───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
 avo:implment    Implement Avo
```
```shell
╭────────────────────────────────────────────────────────────────────────────────────────────────╮
│  > /avo:implment                                                                               │
│    focus on places where we called trackBrowseItemListView, which are primary two components.  │
╰────────────────────────────────────────────────────────────────────────────────────────────────╯
 avo:implment    Implement Avo
```
````
