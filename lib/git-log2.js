'use babel';

import GitLog2View from './git-log2-view';
import { CompositeDisposable } from 'atom';

const MAIN_URI = "atom://git-log2";

export default {

  gitLog2View: null,
  subscriptions: null,

  activate(state) {
    this.gitLog2View = new GitLog2View(state.gitLog2ViewState);
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.workspace.addOpener((filePath) => {
      if (filePath === MAIN_URI) {
        return this.createMainView({uri: MAIN_URI})
      }
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'git-log2:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
    this.gitLog2View.destroy();
  },

  createMainView (state) {
    return this.gitLog2View;
  },

  toggle() {
    atom.workspace.open(MAIN_URI);
    return;
  }

};
