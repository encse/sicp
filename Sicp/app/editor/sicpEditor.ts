﻿module Editor {
    export class SicpEditor
    {
        editor: AceAjax.Editor;
        outputElement: HTMLElement;

        constructor(private editorId: string, private outputId: string) {

            require(['ace/ace'], (ace) => {
                var Range = ace.require("ace/range").Range;

                this.editor = ace.edit("editor");
                this.editor.setTheme('ace/theme/clouds_midnight');
                this.editor.getSession().setMode('ace/mode/sicp');
                this.editor.commands.addCommand({
                    name: 'Evaluate',
                    bindKey: { win: 'Ctrl-E', mac: 'Command-E' },
                    exec: editor => {
                        var st = "";
                        var log = (stT) => {
                            st += stT + "\n";
                            this.setOutput(st);
                        }
                        try {
                            log(new Sicp.Lang.Interpreter().evaluateString(editor.getValue(), log));
                        } catch (ex) {
                            log(ex);
                        }

                        editor.getSession().addMarker(new Range(1,1,1,10), "hello", "blabla", false);
                    }
                });

                this.outputElement = document.getElementById(outputId);
            });
        }

        setOutput(st: string) {
            this.outputElement.innerText = st;
        }

    }
}

