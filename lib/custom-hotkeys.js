'use babel';

import CustomHotkeysView from './custom-hotkeys-view';
import { CompositeDisposable } from 'atom';

export default {

  customHotkeysView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.customHotkeysView = new CustomHotkeysView(state.customHotkeysViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.customHotkeysView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register commands
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'custom-hotkeys:smallerThan': () => this.smallerThan()
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'custom-hotkeys:biggerThan': () => this.biggerThan()
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
    // this.subscriptions.add(atom.commands.add('atom-text-editor', {
      'custom-hotkeys:verticalLine': () => this.verticalLine()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.customHotkeysView.destroy();
  },

  serialize() {
    return {
      customHotkeysViewState: this.customHotkeysView.serialize()
    };
  },

  smallerThan() {
    const editor = atom.workspace.getActiveTextEditor()
    if (editor) {
    editor.insertText('<')
    }
  },

  biggerThan() {
    const editor = atom.workspace.getActiveTextEditor()
    if (editor) {
    editor.insertText('>')
    }
  },

  verticalLine() {
    const editor = atom.workspace.getActiveTextEditor()
     if (editor) {
    editor.insertText('|')
     }
  }
};
